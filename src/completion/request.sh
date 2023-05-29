curl --location --request POST 'http://localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
  "resumeText": "
    John Doe\\n
    123 Main Street, San Francisco, CA 94122\\n
    jdoe@email.com • 123-456-7890\\n\\n
    Summary\\n
    Results-driven marketing professional with 5+ years of experience in content creation, social media management, and marketing campaign execution. Track record of achieving a 30%+ increase in web traffic and 20%+ boost in social media engagement. Seeking to leverage my skills as a Marketing Associate at a fast-growing tech company.  \\n\\n  
    Experience \\n  
    Marketing Associate, XYZ Tech Company • San Francisco, CA • 2019 - Present  \\n
    - Create and publish 3 blog posts per week, achieving a 25% increase in traffic   \\n  
    - Develop social media content and strategy, gaining over 5,000 new followers in 12 months\\n
    - Assist in email campaign and landing page creation, generating $500K in new revenue\" 
}'