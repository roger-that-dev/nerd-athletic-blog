# Simple Blog Generator

## Background

This is a simple static blog generator written in Python. It takes markdown files with frontmatter and converts them into a clean, minimal blog site. The generator handles posts, static pages, tags, and basic image management. While it likely has bugs and rough edges, it meets my needs for a straightforward personal blog without unnecessary complexity.

The code is deliberately simple - it uses Jinja2 for templating, markdown for content, and minimal JavaScript only where needed (like for sidenotes on mobile). There's no database, no complex build process, and no external services required. Just Python scripts that transform markdown into HTML.

## Project Setup

### Prerequisites

- Python 3.13 or higher
- [UV](https://github.com/astral-sh/uv) for dependency management

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog.git
   cd blog
   ```

2. Install dependencies using UV:
   ```bash
   uv pip install -e .
   ```

### Development Environment

The project uses:

- UV for dependency management
- Black for code formatting
- Python 3.13+ for modern features

Key dependencies:

- `markdown` - For Markdown processing
- `jinja2` - For template rendering
- `python-slugify` - For URL slug generation
- `markdown-captions` - For image captions
- `pygments` - For code syntax highlighting
- `Pillow` - For image processing

## Usage

### Setup

- Remove the example posts from the `/post` directory
- Remove/replace the sample about page in the `/static/about` directory
- Update the `config.yaml`
- Update `base.tmpl` with nav bar links in the header and social links in the footer
- Update the favicon generation by editing the string supplied to `generate_favicon`

### Building and Serving

- Run `main.py` to build the site (no arguments needed)
- The site is built to `/web` directory - upload this to your web server
- Use `serve.py` to test the site locally after building

### Creating Content

#### Posts

- Write posts in markdown, name them `index.md` and place in a folder under `/posts`
- Use `new_post.py` to create a new post skeleton - just provide the post name
- Posts are published to `/post/yyyy/mm/dd/slug`
- Post folders can contain images and other content needed by the post
- Posts support frontmatter: title, date, excerpt, tags
- Standard markdown is supported, along with HTML and JavaScript
- Each post gets its own descriptively named folder for easy management

#### Static Pages

- Place static pages in `/static` directory in their own folders
- Pages are served at the url specified in the frontmatter `url` property

### Features

#### Content Features

- Simple config system (`config.yaml`) allowing specification of blog name and author
- Tag system with auto-generated tag pages
- Index page showing all posts (no pagination yet)
- Sidenotes that collapse to clickable inline notes on mobile
- Syntax highlighting for code blocks
- Images (locally served as well as externally) with captions
- Auto-generated favicon
- Script to generate syntax highlighting styles
- In mobile mode nav bar links show as a burdger menu to avoid crowding with smaller viewports

#### Technical Details

- Full site rebuild on each run (fast enough for now)
- No tracking, cookies, or analytics
- No database or external services required
- Minimal JavaScript (only used for mobile sidenotes)
- Built with AI assistance but human-reviewed and maintained
- Tested with screen readers (mostly accessible, except JS-dependent features)

### Implementation Notes

- There are a few example posts to demonstrate features - they are all AI generated
- Built using Python with Jinja2 templating
- Simple architecture prioritizing maintainability
- Some code duplication exists but codebase remains understandable
- Tested with 100+ posts, builds in seconds

### Limitations

- Nev bar links need to be added manually. See `base.tmpl` - no point in automating this yet
- The colour scheme is white, grey and blue, if you want to change it you need to change the CSS
- There is support for only one author name
- Currently no incremental builds or build diffing (not needed yet)
- Not a huge amount of error handling at this point in time
- Much of the code is not yet typed
- The favicon can only be two initials
- There are no tests and I probably won't write any unless I start having problems

## Project Structure

```
blog/
├── css/              # CSS stylesheets
├── js/               # JavaScript files
├── posts/            # Blog posts in markdown
├── scripts/          # Python scripts
├── static/           # Static pages
├── templates/        # Jinja2 templates
├── web/              # Generated site
├── LICENSE           # Apache 2.0 License
└── README.md         
```

## Project management

### Todo

* Post page
    * Author hyperlink doesn't go anywhere.
    * Some other post markdown styles are missing probably.
    * Mobile mode - all fonts need to be a bit smaller.
* CSS
    * Remove duplicate CSS styles.
    * Clean up the CSS so it is properly categorised.
* Deal with accessibility issues when no JS is available.
    * The footnotes dont work in mobile mode. 
        * Maybe instead they can be rendered at the bottom of the page? Figure out how to do this.
* Setup mailing list
    * Buttondown or octopus
    * Add an email subscribe box somewhere on each page

### Backlog

* Add a callout card feature for posts (see the ghost journal theme for inspiration).
* Proper logo to go on the "nav bar"
* Short tweet/post/note feature like on substack. They get intermingled with the regular sized posted on the index page.
* Archive page with titles and exerpts for all posts ordered by date, showing posts by month.
* Series functionality, which allows me to put a post into a numbered series 
    * e.g. "Grade adjusted pace" may be a series of 7 posts. 
    * Need a page to enumerate all series and their posts.
    * An adjacent feature to tags
* Produce a dynamic links menu based upon the static pages, etc.
* Light/dark mode
* Add image zoom for images in blog posts.
    * Pops up a modal with the large size image in
* Add support for different sized images from markdown.
    * Small which is the width of the text
    * Medium which is say 120% of the text
    * Full width which goes across the whole screen
* Add view counts to my pages without intrusive cookies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Usage Disclaimer

This codebase is shared publicly for educational and transparency purposes. While you're welcome to learn from it and reference it, please note:

* The code is tailored specifically for my blog (Nerd Athletic) and may require significant modifications for other use cases
* No warranty or support is provided - use at your own risk
* The design and layout are custom-made for my needs and brand - please create your own unique design rather than copying directly
* Some features may be experimental or in development
* Dependencies and build requirements may change without notice

If you do use any part of this codebase as inspiration, I'd appreciate attribution but it's not required. For questions or issues, feel free to open a GitHub issue but response times may vary.


