# Nerd Athletic Blog

This is a blog based upon [simple blog generator](https://github.com/roger-that-dev/simple-blog-generator).

This repo is the "golden source" for the blog.

The blog is hosted [here](https://nerdathletic.com/) via cloudflare pages. There's no uv tooling on Cloudflare so the build command is:

    python3 -m pip install -r requirements.txt && python3 scripts/main.py

If you want to get in touch then drop me an email: 

    rojeee [at] gmail [dot] com

## Todo

1. Check accessibility of site when javascript is disabled (burger menu breaks and the inline notes probably)
2. Tidy up the graph code and perhaps encapsulate the base graph as a web component


