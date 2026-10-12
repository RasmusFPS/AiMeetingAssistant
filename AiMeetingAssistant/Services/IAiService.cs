using AiMeetingAssistant.DTOs;

namespace AiMeetingAssistant.Services
{
    public interface IAiService
    {
        Task<string> SummarizeNotesAsync(string notes);
        Task<string> GenerateAgendaAsync(AgendaRequest request);
        Task<string> GenerateInvitationAsync(InvitationRequest request);
    }
}
