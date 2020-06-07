import blogs from './blogs';
import general from './general';
import employmentHistory from './employment_history';
import projects from './projects';


export 
const channels = [ 
    {
      name: "General",
      slug: "general",
      description: "Newcastle-based software engineer.",
      id: "general",
      content : general 
    },
    {
      name: "Employment History",
      slug: "employment-history",
      description: "Information about my employment history. Details in threads.",
      id: "employment-history",
      content: employmentHistory
    },
    {
    name: "Blogs",
    slug: "blogs",
    description: "Sometimes I write things! You can find examples of those times below.",
    id: "blogs",
    content: blogs
  }, {
    name: "Projects",
    slug: "projects",
    description: "A collection of projects that you can look at the source code for.",
    id: "projects",
    content: projects
  } 
]


const channelsHashmap =
  channels.reduce(
    (accumulator, current) => ({
      ...accumulator,
      [current.id] : current
    }),
    {}
  )


const getChannel = 
    channel => 
      channelsHashmap[channel]


export default getChannel;