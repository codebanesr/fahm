## Example payload to extract information from resume
```json
{
      "name": "<name from resume>",
      "email": "<email from resume>", 
      "phone": "<phone number from resume>",
      "linkedin": "<linkedin profile url>",
      "github": "<github profile url>",
      "website": "<personal website url>",
      "position": "<most recent position from experience section>",
      "company": "<most recent company from experience section>",
      "experience": [
        {
          "role": "<role>",
          "company": "<company>",
          "start_date": "<start date>",
          "end_date": "<end date>",
          "location": "<location>",
          "description": "<experience description>"
        }
      ],
      "degree": "<highest degree from education section>",
      "university": "<university from education section>",
      "education": [
        {
          "degree": "<degree>",
          "university": "<university>",
          "start_date": "<start date>",
          "end_date": "<end date>",
          "gpa": "<gpa>"
        }
      ],
      "skills": ["<list of skills>"],
      "languages": ["<list of languages>"],
      "interests": ["<list of interests>"],
      "awards": [
        {
          "title": "<award title>",
          "organization": "<organization>",
          "date": "<date received>"
        }
      ],
      "publications": [
        {
          "title": "<publication title>",
          "publisher": "<publisher>",
          "date": "<date published>"
        }
      ],
      "certifications": [
        {
          "title": "<certification title>",
          "organization": "<organization>",
          "date": "<date completed>"
        }
      ] 
    }
```