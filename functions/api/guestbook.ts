// Cloudflare Pages Functions types are provided by @cloudflare/workers-types
interface Env {
  my_wedding: D1Database;
}

interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  date: string;
}

// GET: 방명록 목록 조회
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.my_wedding
      .prepare(
        "SELECT id, author, message, date FROM guestbook ORDER BY created_at DESC"
      )
      .all();

    return new Response(JSON.stringify(results), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch guestbook entries" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// POST: 새 방명록 작성
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as {
      author: string;
      message: string;
      password: string;
    };

    if (!body.author || !body.message || !body.password) {
      return new Response(
        JSON.stringify({ error: "Author, message, and password are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 글자수 제한 (프론트 maxLength와 동일 기준, 우회 방지)
    if (
      body.author.length > 20 ||
      body.password.length > 30 ||
      body.message.length > 500
    ) {
      return new Response(
        JSON.stringify({ error: "입력 길이 제한을 초과했습니다" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const id = crypto.randomUUID();
    const date = new Date().toISOString().split("T")[0];

    await context.env.my_wedding
      .prepare(
        "INSERT INTO guestbook (id, author, message, password, date) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(id, body.author, body.message, body.password, date)
      .run();

    const newEntry: GuestbookEntry = {
      id,
      author: body.author,
      message: body.message,
      date,
    };

    return new Response(JSON.stringify(newEntry), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create guestbook entry" }),
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
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
