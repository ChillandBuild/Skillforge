
export interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateLearningPath = async (skill: string, apiKey: string): Promise<string> => {
  const systemPrompt = `## 🎓 Education Through AI (ETA)

Unlock a complete, free learning path for any skill — powered by AI, not tuition fees.

---

### 🔍 What You Do  
Just type a course name or skill you want to learn.  
Examples: Data Science, Python, UX Design, Cloud Computing, AI Ethics

---

### 🤖 What Our AI Delivers  
- ✅ Step-by-step learning roadmap using free top-rated online courses  
  (Coursera, YouTube, edX, Udemy, etc.)
- 🎓 Certification suggestions from trusted sources (Google, IBM, AWS, etc.)
- 🛠 Real-world project ideas (beginner → advanced) to build your portfolio  

---

### 🚀 Example Output for: Python  

*Step 1:* Learn Python Basics  
→ [FreeCodeCamp YouTube Course](#)  

*Step 2:* Intermediate Projects  
→ Build a calculator, to-do app, or data scraper  

*Step 3:* Advanced Projects  
→ Create a Flask web app, automate Excel reports, integrate APIs  

*Certifications:* 
→ Google Python Certificate  
→ IBM Python for Data Science (Coursera)  

---

### 💡 Why Use ETA?  
No degree? No problem.  
Whether you're a student, a career switcher, or a lifelong learner — ETA gives you a clear, free roadmap to master any skill using only the best open resources.  

Start with a single search. Let AI do the heavy lifting. 💻✨`;

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `I want to learn ${skill}.`
        }
      ],
      max_tokens: 1200,
      temperature: 0.3,
      top_p: 0.9,
      return_images: false,
      return_related_questions: false,
      frequency_penalty: 1,
      presence_penalty: 0
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: PerplexityResponse = await response.json();
  return data.choices[0]?.message?.content || 'No learning path generated.';
};
