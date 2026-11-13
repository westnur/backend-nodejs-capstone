# SecondChance – User Stories

Create each story below as a GitHub Issue (Issues → New issue → **User Story** template) and add the label shown.

| # | Title | Label |
|---|-------|-------|
| 1 | Set up the GitHub repository and project board | new |
| 2 | Create the MongoDB database and import items | backlog |
| 3 | List all available items on the main page | backlog |
| 4 | View the details of an item | backlog |
| 5 | Search items by name, category, condition and age | backlog |
| 6 | Register a new user account | new |
| 7 | Log in and log out securely | new |
| 8 | Update my user profile | icebox |
| 9 | Post a new item with a photo | icebox |
| 10 | Add linting and a CI/CD pipeline | technical debt |
| 11 | Containerize and deploy the application | technical debt |

---

## 1. Set up the GitHub repository and project board
**As a** developer
**I need** a GitHub repository with a project board
**So that** the team can track and manage the work

### Acceptance Criteria
```gherkin
Given the repository exists
When I open the project board
Then I see columns New, Icebox, Backlog, In Progress, Review and Done
```

## 2. Create the MongoDB database and import items
**As a** developer
**I need** a MongoDB database with sample items
**So that** the API has data to serve

### Acceptance Criteria
```gherkin
Given MongoDB is running
When I run the import script
Then 16 documents are inserted into the secondChanceItems collection
```

## 3. List all available items on the main page
**As a** user
**I need** to see all items that are being given away
**So that** I can find something useful for free

### Acceptance Criteria
```gherkin
Given I open the main page
When the page loads
Then I see a list of all available items
```

## 4. View the details of an item
**As a** user
**I need** to open an item and see its details
**So that** I can decide whether I want it

### Acceptance Criteria
```gherkin
Given I am on the main page
When I click on an item
Then I see its name, category, condition, age and description
```

## 5. Search items by name, category, condition and age
**As a** user
**I need** to filter items
**So that** I can quickly find what I am looking for

### Acceptance Criteria
```gherkin
Given I am on the search page
When I choose a category and press Search
Then only items from that category are shown
```

## 6. Register a new user account
**As a** new user
**I need** to register with my name, email and password
**So that** I can post and request items

### Acceptance Criteria
```gherkin
Given I am on the registration page
When I submit valid details
Then my account is created and I receive an auth token
```

## 7. Log in and log out securely
**As a** registered user
**I need** to log in with my email and password
**So that** I can access my account

### Acceptance Criteria
```gherkin
Given I have an account
When I enter the correct email and password
Then I am logged in and see my name
```

## 8. Update my user profile
**As a** registered user
**I need** to update my profile information
**So that** my details stay correct

### Acceptance Criteria
```gherkin
Given I am logged in
When I change my name and save
Then my profile shows the new name
```

## 9. Post a new item with a photo
**As a** user
**I need** to post an item with a photo
**So that** other users can see what I am giving away

### Acceptance Criteria
```gherkin
Given I am logged in
When I fill in the item form and upload a photo
Then the item appears in the item list
```

## 10. Add linting and a CI/CD pipeline
**As a** developer
**I need** automatic linting and builds on every push
**So that** code quality stays high

### Acceptance Criteria
```gherkin
Given I push code to main
When the GitHub Actions workflow runs
Then linting and build steps pass
```

## 11. Containerize and deploy the application
**As a** developer
**I need** Docker images for the services
**So that** the app can be deployed to the cloud

### Acceptance Criteria
```gherkin
Given the Dockerfile exists
When I build and run the image
Then the landing page is reachable at the deployment URL
```
