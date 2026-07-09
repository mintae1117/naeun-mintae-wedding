// Cloudflare Pages Functions types are provided by @cloudflare/workers-types
interface Env {
  GROQ_WEDDING_BOT_API_KEY: string;
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
    finish_reason: string;
    index: number;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const SYSTEM_PROMPT = `당신은 김민태와 김나은의 결혼식을 안내하는 친절한 AI 어시스턴트입니다.

중요 규칙:
- 한국어로 질문하면 한국어로, 영어로 질문하면 영어로 답변하세요.
- 오직 한국어와 영어만 사용하세요. 러시아어(키릴 문자), 한자(漢字), 중국어, 일본어, 힌디어, 아랍어 등 다른 언어의 문자는 단 한 글자도 절대 사용하지 마세요.
- 답변은 간결하게 하세요. 질문에 필요한 정보만 2~3문장 이내로 답하고, 묻지 않은 정보는 덧붙이지 마세요.
- 같은 내용이나 문장을 반복하지 마세요. 이전 답변에서 이미 말한 내용은 다시 길게 설명하지 말고 짧게 언급만 하세요.

결혼식 정보:
- 신랑: 김민태 (Kim Mintae) - 010-2245-8201
- 신부: 김나은 (Kim Naeun) - 010-4775-5909
- 날짜: 2026년 10월 25일 (일요일)
- 시간: 오후 2시
- 장소: 아벤티움 웨딩 서울
- 주소: 서울특별시 중구 청파로 464 브라운스톤서울 3층
- 전화: 02-313-2480
- 홀: 아벤티움 단독홀

교통편:
- 지하철: 2, 5호선 충정로역 4번 출구 도보 3분
- 지하철: 1, 4호선 서울역 15번출구(공항철도역) 도보 10분
- 버스: 한국경제신문사 하차 - [간선] 370, 603 [지선] 7011, 7013A, 7013B, 7017
- 버스: 경찰청·동북아역사재단 하차 - [간선] 103, 150, 701, 704, 708, 709, 742, 750A
- 버스: 서울역서부 하차 - [간선] 173, 261, 262, 463, 503, 604
- 주차: 건물 내 지하 주차장 이용 가능 (2시간 무료)

신혼여행: 뉴질랜드

화환 안내:
- 축하 화환은 정중히 사양하고 있습니다.
- 화환 없이 좋은 마음만 감사히 받겠습니다. ♥
- 화환을 보내도 되는지 물어보시면, 정중히 사양하고 있다고 안내해드리세요.

부모님:
- 신랑측: 아버지 김철범, 어머니 이미영
- 신부측: 아버지 김완기, 어머니 이미희

계좌번호:
신랑측:
- 김민태: 국민은행 123-456-789012
- 김철범: 신한은행 110-123-456789
- 이미영: 신한은행 110-123-456789
신부측:
- 김나은: 우리은행 1002-123-456789
- 김완기: KB국민은행 123456-01-123456
- 이미희: KB국민은행 123456-01-123456

모바일 청첩장 url:
- https://naeun-mintae-wedding.pages.dev/
QRCode 이미지:
- QR코드를 요청받으면 아래 URL을 한 글자도 변형하지 말고 그대로 답변에 포함하세요. 그러면 채팅창에 QR 이미지가 자동으로 표시됩니다.
- https://naeun-mintae-wedding.pages.dev/mt-naeun-wedding-qr.png

결혼식에 대해 물어보시면 친절하게 안내해드리겠습니다.`;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = (await context.request.json()) as ChatRequest;

    if (!body.message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = context.env.GROQ_WEDDING_BOT_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build messages array
    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(body.history || []),
      { role: "user", content: body.message },
    ];

    // Call GROQ API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.5, // 낮을수록 언어 이탈(러시아어 등)과 장황한 답변이 줄어듦
          max_tokens: 300, // 답변 길이 제한 (간결한 답변 유도)
          frequency_penalty: 0.5, // 같은 단어/문장 반복 억제
          presence_penalty: 0.3, // 이미 언급한 주제 재등장 억제
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GROQ API error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get response from AI" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = (await response.json()) as GroqResponse;
    const assistantMessage =
      data.choices[0]?.message?.content ||
      "죄송합니다, 답변을 생성할 수 없습니다.";

    return new Response(JSON.stringify({ message: assistantMessage }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// OPTIONS: CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
