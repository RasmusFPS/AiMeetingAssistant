namespace AiMeetingAssistant.DTOs
{
    public record SummarizeRequest(string Notes);
    public record AgendaRequest(string Topic, string Duration, string? Goals);
    public record InvitationRequest(string Title, string DateAndTime, string Location, string Purpose);

    public record AiResponse(string Result);
}
