function lambda(input, callback) {

  let result = [
      {
        type: "systemMessage", // Returns a system message into the conversation.
        text: "FaaS: Looks like the conversation is idle"
      },
      {
        type: "transfer", // Transfers the conversation to a new skill.
        skillId: "SKILL_ID"
      }
  ];

  callback(null, result);
}