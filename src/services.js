const apiUrl =
    "https://ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com/ipl/feeds/stats/203-groupstandings.js?ongroupstandings=_jqjsp&_1743689710010="; // Replace with the actual API URL
const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    apiUrl
)}`;

export async function fetchStandings() {
    try {
        const response = await fetch(proxyUrl); // Replace with the actual API URL
        const textData = await response.text(); // Get response as text

        // Extract JSON data from the text response
        const jsonString = textData.match(/\{[\s\S]*\}/)?.[0]; // Extracts JSON part
        if (!jsonString) {
            throw new Error("Invalid response format");
        }

        const jsonData = JSON.parse(jsonString);
        return transformTeamsData(jsonData.points);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function transformTeamsData(teams) {
    console.log(teams);
    return teams.map((team) => {
        const parseOvers = (input) => {
            let parts = input.split(".");
            if (parts.length !== 2) return parseFloat(input); // Return input as number if no decimal part

            let wholeNumber = parseInt(parts[0]);
            let decimalPart = parseInt(parts[1]);

            let newDecimal = decimalPart / 6; // Convert to decimal

            return wholeNumber + newDecimal;
        };

        return {
            run: Number(team.ForTeams.split("/")[0]),
            runAgainst: Number(team.AgainstTeam.split("/")[0]),
            overs: parseOvers(team.ForTeams.split("/")[1]),
            oversAgainst: parseOvers(team.AgainstTeam.split("/")[1]),
            runRate: Number(team.NetRunRate),
            name: team.TeamCode,
            Draw: team.Draw,
            IsQualified: team.IsQualified,
            Loss: team.Loss,
            Matches: team.Matches,
            NoResult: Number(team.NoResult),
            Performance: team.Performance,
            Points: team.Points,
            TeamLogo: team.TeamLogo,
            Tied: Number(team.Tied),
            Wins: team.Wins,
        };
    });
}
