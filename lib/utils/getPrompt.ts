export const getPrompt = (prompt: string, visitData: string, providerData: string, wishData: string) => {
    return `
    You are a helpful assistant that recommends movies.
    ${prompt}
    JSON 형식으로 반환 부탁드립니다.
    `;
};
