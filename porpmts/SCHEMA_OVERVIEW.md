# Portfolio Schema Overview

## Core Document Types

### Education
- **Type**: Document
- **Key Fields**:
  - `degree` (string, required) - Degree/Qualification
  - `institution` (object) - Institution details
    - `name` (string, required)
    - `website` (url)
    - `logo` (image)
    - `location` (string)
  - `startDate` (date, required)
  - `endDate` (date, optional)
  - `fieldOfStudy` (string)
  - `description` (array of blocks and images)
  - `achievements` (array of references to Achievement)
  - `categories` (array of references to Category)
  - `additionalInfo` (object)
    - `gpa` (number, 0-4.0)
    - `skills` (array of references to Skill)
    - `projects` (array of references to Project)
    - `certifications` (array of references to Certification)

### Experience
- **Type**: Document
- **Key Fields**:
  - `jobTitle` (string, required)
  - `company` (string, required)
  - `location` (string)
  - `startDate` (date, required)
  - `endDate` (date)
  - `description` (array of blocks and images)
  - `achievements` (array of references to Achievement)
  - `metadata` (object)
    - `technologies` (array of strings)
    - `skills` (array of references to Skill)
    - `projects` (array of references to Project)
  - `isCurrent` (boolean)

### Certification
- **Type**: Document
- **Key Fields**:
  - `title` (string, required)
  - `issuingOrganization` (object)
    - `name` (string, required)
    - `website` (url)
    - `logo` (image)
  - `certificateImage` (image)
    - `alt` (string, required)
  - `dateIssued` (date, required)
  - `expirationDate` (date)
  - `verificationLink` (url)
  - `description` (array of blocks and images)
  - `categories` (array of references to Category)
  - `additionalInfo` (object)
    - `certificationId` (string)
    - `skills` (array of references to Skill)
    - `projects` (array of references to Project)
    - `autoTags` (array of strings, read-only)
  - `status` (string enum: active/expired/pending)

### Achievement
- **Type**: Document
- **Key Fields**:
  - `title` (string, required)
  - `slug` (slug from title)
  - `description` (text)
  - `date` (date)
  - `metric` (string) - Quantifiable achievement
  - `link` (url)
  - Includes baseMetadata fields

## Reusable Components

### Base Metadata
- **Type**: Object
- **Fields**:
  - `tags` (array of strings)
  - `isFeatured` (boolean)

## Referenced Types

### Category
- Referenced by: Education, Certification
- Used for: Classification and filtering

### Skill
- Referenced by: Education, Experience, Certification
- Used for: Showcasing competencies

### Project
- Referenced by: Education, Experience, Certification
- Used for: Portfolio items and work samples

## Frontend Considerations

### Data Relationships
1. **Achievement Links**:
   - Achievements can be linked to Education and Experience
   - Consider displaying achievements in both contexts

2. **Skill Tracking**:
   - Skills appear across Education, Experience, and Certifications
   - Can be used to build a comprehensive skill matrix

3. **Project Integration**:
   - Projects are referenced from multiple sources
   - Consider a unified project view with related experiences/education

### UI Components Needed
1. **Timeline Views**:
   - Education history
   - Work experience
   - Certification timeline

2. **Card Components**:
   - Achievement cards
   - Certification cards
   - Education institution cards
   - Experience cards

3. **Rich Content Display**:
   - Rich text renderer for descriptions
   - Image galleries with hotspot support
   - URL/Link handlers

4. **Filtering & Search**:
   - Category-based filtering
   - Skill-based search
   - Date range filtering

### Data Loading Strategy
1. **Main Queries**:
   ```groq
   // Example GROQ queries for frontend
   
   // Get all education with related data
   *[_type == "education"]{
     ...,
     "achievements": achievements[]->{...},
     "institution": institution{...},
     "skills": additionalInfo.skills[]->{...}
   }

   // Get experience with achievements
   *[_type == "experience"]{
     ...,
     "achievements": achievements[]->{...},
     "skills": metadata.skills[]->{...}
   }

   // Get certifications with status
   *[_type == "certification"]{
     ...,
     "issuer": issuingOrganization{...},
     "skills": additionalInfo.skills[]->{...}
   }
   ```

2. **Performance Considerations**:
   - Use references for optimal data loading
   - Implement pagination where needed
   - Consider data preloading for critical sections

### Special Features
1. **Dynamic Status**:
   - Current role indicator in Experience
   - Certification status (active/expired)
   - Education completion status

2. **Rich Media**:
   - Image hotspot support across all image fields
   - Certificate image display
   - Institution/Company logos

3. **Metadata Usage**:
   - Featured items highlighting
   - Tag-based filtering
   - AI-generated tags for certifications
