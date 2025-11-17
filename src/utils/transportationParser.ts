export interface SubwayLine {
  line: string;
  color: string;
}

export interface BusRoute {
  type: "trunk" | "branch"; // trunk: 간선, branch: 지선
  number: string;
  color: string;
}

export interface ParsedTransportation {
  type: "subway" | "bus";
  text: string;
  subwayLines?: SubwayLine[];
  busRoutes?: BusRoute[];
}

// 지하철 호선 색상 매핑
export const SUBWAY_COLORS: Record<string, string> = {
  "1호선": "#062F92",
  "2호선": "#0FA642",
  "3호선": "#EF7C1C",
  "4호선": "#0099D1",
  "5호선": "#996CAC",
  "6호선": "#A95094",
  "7호선": "#747F00",
  "8호선": "#E6186C",
  "9호선": "#BDB092",
  공항철도: "#028FA0",
  경의중앙선: "#77C4A3",
  경춘선: "#0C8E72",
  수인분당선: "#FABE00",
  신분당선: "#D31145",
  우이신설선: "#B0CE18",
};

// 버스 노선 색상
export const BUS_COLORS = {
  trunk: "#0C347E", // 간선 - 파란색
  branch: "#3B9F37", // 지선 - 초록색
};

// 지하철 정보 파싱
export function parseSubwayInfo(description: string): SubwayLine[] {
  const lines: SubwayLine[] = [];

  // "2호선, 5호선" 또는 "1호선, 4호선" 형태 파싱
  const lineRegex =
    /(\d+호선|공항철도|경의중앙선|경춘선|수인분당선|신분당선|우이신설선)/g;
  const matches = description.match(lineRegex);

  if (matches) {
    matches.forEach((line) => {
      const color = SUBWAY_COLORS[line] || "#999";
      lines.push({ line, color });
    });
  }

  return lines;
}

// 버스 정보 파싱
export function parseBusInfo(description: string): BusRoute[] {
  const routes: BusRoute[] = [];

  // [간선] 또는 [지선] 다음에 오는 숫자들 파싱
  const trunkRegex = /\[간선\]\s*([\d,\s]+)/;
  const branchRegex = /\[지선\]\s*([\d,\sA-Z]+)/;

  const trunkMatch = description.match(trunkRegex);
  if (trunkMatch) {
    const numbers = trunkMatch[1].split(",").map((n) => n.trim());
    numbers.forEach((number) => {
      routes.push({
        type: "trunk",
        number,
        color: BUS_COLORS.trunk,
      });
    });
  }

  const branchMatch = description.match(branchRegex);
  if (branchMatch) {
    const numbers = branchMatch[1].split(",").map((n) => n.trim());
    numbers.forEach((number) => {
      routes.push({
        type: "branch",
        number,
        color: BUS_COLORS.branch,
      });
    });
  }

  return routes;
}

// Transportation description 파싱
export function parseTransportation(
  type: "subway" | "bus",
  description: string
): ParsedTransportation {
  const result: ParsedTransportation = {
    type,
    text: description,
  };

  if (type === "subway") {
    result.subwayLines = parseSubwayInfo(description);
  } else if (type === "bus") {
    result.busRoutes = parseBusInfo(description);
  }

  return result;
}
