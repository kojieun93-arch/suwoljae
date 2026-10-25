export type TopicId = "love" | "wealth" | "career" | "overall";

export type TopicOption = {
  id: TopicId;
  title: string;
  description: string;
};

export const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: "love",
    title: "인연운",
    description: "사랑과 인간관계",
  },
  {
    id: "wealth",
    title: "재물운",
    description: "돈과 재정 고민",
  },
  {
    id: "career",
    title: "직업운",
    description: "진로와 직장",
  },
  {
    id: "overall",
    title: "종합운세",
    description: "나의 전체적인 운명",
  },
];

const STORAGE_KEY = "suwoljae.selectedTopic";

export function getTopicById(id: TopicId | null): TopicOption | null {
  if (!id) return null;
  return TOPIC_OPTIONS.find((t) => t.id === id) ?? null;
}

export function loadSelectedTopic(): TopicId | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    if (TOPIC_OPTIONS.some((t) => t.id === raw)) {
      return raw as TopicId;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveSelectedTopic(id: TopicId | null) {
  if (typeof window === "undefined") return;
  try {
    if (!id) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // ignore quota / private mode
  }
}
