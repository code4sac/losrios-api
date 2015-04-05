# losrios-api
An API for accessing structured Los Rios Community College class data

## Instructions

1. From a command prompt / terminal window / shell window run `node app.js`.
2. Navigate to `localhost:3000/api/1159/ARC/ACCT`

This will return data for the Accounting classes being held at American River College during the Fall 2015 semester.

## API Details

Calls to the API can be constructed as follows:

`[host]/api/[semester code]/[campus code]/[subject code]`

### Example Semester Codes

- Spring 2015: `1153`
- Summer 2015: `1156`
- Fall 2015: `1159`

### Example Campus Codes

- American River College: `ARC`
- Cosumnes River College: `CRC`
- Folsom Lake College: `FLC`
- Sacramento City College: `SCC`

### Example Subject Codes

- Accounting: `ACCT`
- Administration of Justice: `ADMJ`
- Biology: `BIOL`
- Business: `BUS`
- English - Education: `ENGED` 
- Spanish: `SPAN`

A full list of the subject codes can be found on the [Los Rios Community College District class search website](http://dcs.losrios.edu/dcs_classsearch.aspx).
