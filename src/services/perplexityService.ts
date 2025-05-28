
export interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const generateMockResponse = (skill: string): string => {
  return `# 🚀 ${skill} Learning Roadmap

## 🎯 **Step-by-Step Learning Path**

### 📚 **Beginner Level (4-6 weeks)**
**Step 1: Master the Fundamentals**
→ **FreeCodeCamp ${skill} Course** - Complete interactive tutorials
→ **YouTube: ${skill} Crash Course** - Watch comprehensive overview videos
→ **Khan Academy ${skill} Basics** - Practice fundamental concepts

**Step 2: Hands-On Practice**
→ Build your first simple project
→ Follow along with guided tutorials
→ Join ${skill} communities and forums

### 🔧 **Intermediate Level (6-8 weeks)**
**Step 3: Apply Your Knowledge**
→ **Coursera ${skill} Specialization** - Take structured courses
→ **edX ${skill} Professional Certificate** - Earn verified certificates
→ Build 2-3 intermediate projects for your portfolio

**Step 4: Real-World Applications**
→ Contribute to open-source projects
→ Start freelancing small ${skill} tasks
→ Network with ${skill} professionals

### 🏆 **Advanced Level (8-12 weeks)**
**Step 5: Specialize and Excel**
→ **AWS/Google Cloud ${skill} Training** - Learn cloud integration
→ **Advanced ${skill} Bootcamp** - Master complex concepts
→ Build enterprise-level projects

## 🎓 **Recommended Certifications**
→ **Google ${skill} Professional Certificate** (Coursera)
→ **IBM ${skill} Certification** (edX)
→ **Microsoft ${skill} Associate** (Microsoft Learn)
→ **AWS ${skill} Specialty** (AWS Training)

## 🛠️ **Portfolio Project Ideas**

**Beginner Projects:**
→ Simple ${skill} calculator/tool
→ Basic ${skill} dashboard
→ Personal ${skill} portfolio website

**Intermediate Projects:**
→ ${skill} automation system
→ Interactive ${skill} web application
→ ${skill} data analysis project

**Advanced Projects:**
→ Full-stack ${skill} platform
→ ${skill} machine learning integration
→ Enterprise ${skill} solution

## 📊 **Learning Timeline**
- **Total Duration:** 4-6 months (part-time)
- **Weekly Commitment:** 10-15 hours
- **Certification Timeline:** 2-3 months additional

## 🌟 **Top Free Resources**
→ **FreeCodeCamp** - Interactive ${skill} curriculum
→ **YouTube** - ${skill} tutorials and crash courses
→ **Coursera** - Audit courses for free
→ **edX** - Free course access
→ **GitHub** - Open source ${skill} projects

---
⚠️ **Disclaimer:** This is for informational purposes only. Course availability or certification requirements may change. Always refer to the official learning platforms for the most current details.`;
};

export const generateLearningPath = async (skill: string, apiKey: string): Promise<string> => {
  const systemPrompt = `You are SkillForge, an AI-powered learning path generator that provides instant, curated, and trusted step-by-step learning roadmaps for anyone looking to master a skill online. Your mission is to cut through the noise and deliver focused, structured guidance using only top-rated and free (or affordable) learning resources from across the web.

When a user types in a course name or skill they want to learn, you will deliver:

1. Step-by-Step Roadmap: A logical, easy-to-follow progression from beginner to advanced, using the best free or low-cost online resources available. Prioritize platforms like Coursera, YouTube, edX, Khan Academy, Udemy (free or budget), and Google/IBM/AWS learning paths.
2. Certifications: Recommend official, well-recognized certifications (if available) that the learner can pursue to validate their skill, especially from Google, IBM, Microsoft, AWS, etc.
3. Real-World Project Ideas: Suggest practical project ideas aligned with each skill level (beginner, intermediate, advanced) that help users apply what they've learned and build a strong portfolio.
4. Resource Links: Each course or suggestion should be paired with a direct, verifiable link to the learning material or certification.
5. Disclaimer: Include a persistent disclaimer: 'This is for informational purposes only. Course availability or certification requirements may change. Always refer to the official learning platforms for the most current details.'

Maintain a fast, clean, motivating, and beginner-friendly tone. Keep everything accessible, modern, and empowering. Avoid jargon unless necessary. No upselling. Do not generate affiliate links. Prioritize free and high-quality resources over paid ones. Ask clarifying follow-up questions if a user request is too broad (e.g., 'Do you want to learn front-end or back-end web development?').

Format the output with markdown-style clarity using bullet points, bold titles, and emojis for easy scanning.`;

  try {
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
      console.log('Perplexity API failed, using mock response');
      return generateMockResponse(skill);
    }

    const data: PerplexityResponse = await response.json();
    return data.choices[0]?.message?.content || generateMockResponse(skill);
  } catch (error) {
    console.log('Network error, using mock response:', error);
    return generateMockResponse(skill);
  }
};
