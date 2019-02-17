# Tuntikortti
A hobby project to help tracking of workhours

This is a project made for tracking of workhours at my job. It saves workhours, dates and tasks done to a database and shows charts and other statistics.

As a little joke, I also made it possible for one to add 'accidents' happened at work, aswell as parse sleep data from Withings devices, so one can search for connection between lack of sleep and accidents caused.

This project is done with React, Nodejs and their respected libraries, such as C3\D3 for displaying the charts. 
The database is implemented using sqlite, for now. It also uses server sided rendering.

What I have tried to implement is:
- Data validation. Both on client side and on server side. This is so that one can't send wrong data through forms or by doing manual post-requests.
- Browsing of workhours by entering a begin and end date
- Charts showing useless and useful information, such as average workhours per day, etc.
- Integrating Withings and MyFitnessPal data as a little fun side feature

Originally I was planning to integrate this project with Withings api, but sadly, their api isn't very good and I couldn't register a new application, so I had to just export CSV data and parse it manually to DB.


This project is still very unpolished, but contains all the main features that I wanted to implement. If you are a recruiter, I would ideally like you to see this project as something that "has the right ideas" instead of "has everythign implemented perfectly"
