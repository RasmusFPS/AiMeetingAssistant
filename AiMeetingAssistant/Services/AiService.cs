using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using AiMeetingAssistant.DTOs;

namespace AiMeetingAssistant.Services
{
    public class AiService : IAiService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public AiService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public Task<string> SummarizeNotesAsync(string notes)
        {
            string systemPrompt = "Du är en professionell mötesassistent. Sammanfatta följande mötesanteckningar på svenska med rubriker för 'Viktiga beslut' och 'Åtgärdspunkter' sist Skriv kort och koncist, skriv inte med prompten i ditt svar";

            string fullPrompt = $"{systemPrompt}\n\n{notes}";
            return CallGeminiAsync(fullPrompt);
        }

        public Task<string> GenerateAgendaAsync(AgendaRequest request)
        {
            string fullPrompt =
                "Du är en mötesexpert. Skapa en strukturerad, tidsatt och professionell mötesagenda på svenska baserat på följande:\n" +
                $"- Ämne: {request.Topic}\n" +
                $"- Tidslängd: {request.Duration}\n" +
                $"- Mål/Syfte: {request.Goals ?? "Ej angivet"}" +
                "Skriv kort och koncist, skriv inte med prompten i ditt svar";

            return CallGeminiAsync(fullPrompt);
        }

        public Task<string> GenerateInvitationAsync(InvitationRequest request)
        {
            string fullPrompt =
                "Du är en professionell kommunikatör. Skapa ett formellt och trevligt utkast till en mötesinbjudan i mejlformat på svenska baserat på följande:\n" +
                $"- Mötestitel: {request.Title}\n" +
                $"- Tid: {request.DateAndTime}\n" +
                $"- Plats/Länk: {request.Location}\n" +
                $"- Syfte/Beskrivning: {request.Purpose}"+
                "Skriv kort och koncist, skriv inte med prompten i ditt svar";

            return CallGeminiAsync(fullPrompt);
        }

        public async Task<string> CallGeminiAsync(string prompt)
        {
            var apiKey = _configuration["Gemini:ApiKey"];
            var model = _configuration["Gemini:Model"];

            var requestBody = new
            {
                contents = new[]
                {
                new
                {
                    parts = new[]
                    {
                        new
                        {
                            text = prompt
                        }
                    }
                }
                }
            };

            var response = await _httpClient.PostAsJsonAsync($"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}",
            requestBody);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Gemini API fel ({response.StatusCode}): {error}");
            }

            var rawJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(rawJson);

            var generatedText = doc.RootElement
            .GetProperty("candidates")[0]
            .GetProperty("content")
            .GetProperty("parts")[0]
            .GetProperty("text")
            .GetString();

            return generatedText?.Trim() ?? "Inget svar kunde genereras.";
        }
    }
}
