using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AiMeetingAssistant.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiController : ControllerBase
    {
        [HttpPost("summarize")]

        [HttpPost("agenda")]

        [HttpPost("invitation")]
    }
}
