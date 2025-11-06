// Cloudflare Pages Functions types are provided by @cloudflare/workers-types
interface Env {
  my_wedding: D1Database;
}

// DELETE: 방명록 삭제 (비밀번호 확인)
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const id = context.params.id as string;
    const body = (await context.request.json()) as {
      password: string;
    };

    if (!body.password) {
      return new Response(
        JSON.stringify({ error: "Password is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 비밀번호 확인
    const { results } = await context.env.my_wedding
      .prepare("SELECT password FROM guestbook WHERE id = ?")
      .bind(id)
      .all();

    if (!results || results.length === 0) {
      return new Response(
        JSON.stringify({ error: "Guestbook entry not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const entry = results[0] as { password: string };

    if (entry.password !== body.password) {
      return new Response(
        JSON.stringify({ error: "비밀번호가 일치하지 않습니다" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 삭제 실행
    await context.env.my_wedding
      .prepare("DELETE FROM guestbook WHERE id = ?")
      .bind(id)
      .run();

    return new Response(
      JSON.stringify({ success: true, message: "삭제되었습니다" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting guestbook entry:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete guestbook entry" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// OPTIONS: CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
