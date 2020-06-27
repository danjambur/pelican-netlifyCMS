#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

SITENAME = "Site Name"
SITEURL = "localhost:8000"
LOAD_CONTENT_CACHE = False

PATH = "content"
OUTPUT_PATH = "dist"

TIMEZONE = "GMT"

DEFAULT_LANG = "English"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = ()

# Social widget
SOCIAL = (("You can add links in your config file", "#"),
          ("Another social link", "#"),)
 
DEFAULT_PAGINATION = 10
USE_FOLDER_AS_CATEGORY = True

STATIC_PATHS = ["uploads", "admin"]
ARTICLE_EXCLUDES = ["admin"]

THEME = "themes/northernlights"

CMS_ENV = "development"

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
