using AiMeetingAssistant.DTOs;
using AiMeetingAssistant.Services;
using Microsoft.AspNetCore.Mvc;

namespace AiMeetingAssistant.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly IAiService _aiService;

    public AiController(IAiService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("summarize")]
    public async Task<ActionResult<AiResponse>> Summarize([FromBody] SummarizeRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Notes))
            return BadRequest("Anteckningar får inte vara tomma.");

        var result = await _aiService.SummarizeNotesAsync(request.Notes);
        return Ok(new AiResponse(result));
    }

    [HttpPost("agenda")]
    public async Task<ActionResult<AiResponse>> Agenda([FromBody] AgendaRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Topic))
            return BadRequest("Ämne måste anges.");

        var result = await _aiService.GenerateAgendaAsync(request);
        return Ok(new AiResponse(result));
    }

    [HttpPost("invitation")]
    public async Task<ActionResult<AiResponse>> Invitation([FromBody] InvitationRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title) || string.IsNullOrWhiteSpace(request.DateAndTime))
            return BadRequest("Titel och Tid måste anges.");

        var result = await _aiService.GenerateInvitationAsync(request);
        return Ok(new AiResponse(result));
    }
}