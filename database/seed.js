import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

// Create a single Supabase client for interacting with your database
export const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const logErrorAndExit = (tableName, error) => {
  console.error(`An error occurred in table '${tableName}':`, error)
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage)
}

// Seed the projects table
const seedProjects = async (numEntries) => {
  logStep('Seeding projects...')
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    projects.push({
      name: name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      description: faker.lorem.paragraphs(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements(['user1', 'user2', 'user3']),
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully.')

  return data
}

// Seed the tasks table
const seedTasks = async (numEntries, projectIds) => {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    const projectId = faker.helpers.arrayElement(projectIds) // Ensure valid project_id
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future().toISOString().split('T')[0], // Format as `YYYY-MM-DD`
      project_id: projectId,
      collaborators: faker.helpers.arrayElements(['user1', 'user2', 'user3']),
    })
  }

  console.log('Tasks to insert:', tasks) // Debugging: Log tasks data

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error) return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully.')

  return data
}

// Main function to seed the database
const seedDatabase = async (numEntriesPerTable) => {
  const projects = await seedProjects(numEntriesPerTable)
  const projectIds = projects.map((project) => project.id)

  if (!projectIds.length) {
    console.error('No valid project IDs found. Cannot seed tasks.')
    process.exit(1)
  }

  console.log('Valid Project IDs:', projectIds) // Debugging: Log project IDs

  await seedTasks(numEntriesPerTable, projectIds)
}

// Number of entries per table
const numEntriesPerTable = 10

// Execute the seeding
seedDatabase(numEntriesPerTable).catch((error) => {
  console.error('An unexpected error occurred:', error)
  process.exit(1)
})
