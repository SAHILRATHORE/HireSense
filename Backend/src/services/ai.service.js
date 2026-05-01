const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// async function invokeGeminiAi(){
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents:"Hello Gemini : Explain what is interview"
//     })

//     console.log(response.text)
// }

const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question can be asked in the interview"),
        intension: z.string().description("The intention of interviewer behind asking this technical question"),
        answer: z.string().description("How to answer this technical question, what points to cover, what approach to use while answering this question")
    })).description("Technical questions that can be asked in the interview along with the intention and how to answer them"),
    behaviourQuestions: z.array(z.object({
        question: z.string().description("The behavioural question can be asked in the interview"),
        intension: z.string().description("The intention of interviewer behind asking the behavioural question"),
        answer: z.string().description("How to answer this behavioural question, what points to cover, what approach to use while answering this question")
    })).description("Behavioural questions that can be asked in the interview along with the intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().description("The skill in which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).description("The severity of the skill gap")
    })).description("Skill gaps that the candidate needs to work on along with the severity"),
    preparationPlan: z.array(z.object({
        day: z.number().description("The day number in the preparation plan, starting from 1"),
        focus: z.string().description("The focus of the day in the preparation plan, what the candidate should focus on that day"),
        tasks: z.array(z.string()).description("List of actionable tasks that the candidate should do on that day to prepare for the interview"),
    })).description("A day-wise preparation plan for the candidate to prepare for the interview, with each day having a specific focus and actionable tasks") 
})

async function generateInterviewReport({ jobDescription, resume, selfDescription }) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:"",
        config:{
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })
} 

module.exports = { generateInterviewReport }