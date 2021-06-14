const resolvers = 
{
    Query: {
        topics: () => {
        return [
            {"id":1097,"path":"Oprichting / Oprichting van vennootschap / Oprichting via fusie","label":"Oprichting via fusie"},
            {"id":1098,"path":"Kost / Kost eigen aan de werkgever / Verplaatsingskost woon-werkverkeer","label":"Verplaatsingskost woon-werkverkeer"} 
        ];
        },
    }
}

module.exports = resolvers;