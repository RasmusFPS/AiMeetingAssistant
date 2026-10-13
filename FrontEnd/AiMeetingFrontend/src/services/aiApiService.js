const BASE_URL = "https://localhost:7115/api/Ai"

export async function summarize(notes) {
    const response = await fetch (`${BASE_URL}/summarize`, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({notes})
        }
    );

    if(!response) throw new Error(await response.text());
    const data = await response.json();
    return data.result;
}

export async function agenda(agendaData) {
    const response = await fetch (`${BASE_URL}/agenda`, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(agendaData)
    });

    if(!response) throw new Error(await response.text());
    const data = await response.json();
    return data.result;
}

export async function Invitation(invitationData){
    const response = await fetch (`${BASE_URL}/invitation`, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(invitationData)
    });

    if(!response) throw new Error(await response.text());
    const data = await response.json();
    return data.result;
}