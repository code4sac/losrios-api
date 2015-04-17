(function (parser) {
	'use strict';
	
	var $ = require('cheerio');
	
	var colleges = {
		'American River College': 'ARC',
		'Cosumnes River College': 'CRC',
		'Folsom Lake College': 'FLC',
		'Sacramento City College': 'SCC'
	};
	
	parser.parseClasses = function (body) {
		
		var classes = [];
		var college = '';
		var collegeId = '';

		$('#ctl00_cphMain_gvSearch tr', body).each(function (i, elem) {

			if ($('td.GridCampus span', elem).length > 0)	{
				college = $('td.GridCampus span', elem)[0].children[0].data.trim();
				collegeId = colleges[college];
			} else {
				var c = { 
					college: {
						id: collegeId,
						name: college	
					}
				};

				var subjectCell = $('td.Subject div', elem);
				if (subjectCell.length > 0) {
					var subjects = subjectCell[0].children[0].data.split('\r\n');
					c.subject = {
						code: subjects[1].trim(),
						level: subjects[2].trim(),
						type: subjects[3].trim()
					};
				}

				var courseCell = $('td.Course div', elem);
				if (courseCell.length > 0) {
					c.name = courseCell[0].children[1].children[0].data.trim();

					var href = courseCell[0].children[1].attribs.href;
					href = href.substring((href.indexOf('"') + 1), href.lastIndexOf('"'));
					c.href = 'http://dcs.losrios.edu/' + href;			
				}
				
				var instructorCell = $('td.Instructor', elem);
				if (instructorCell.length > 0) {
					c.instructor = instructorCell[0].children[0].data.trim();
				}
				
				var daysCell = $('td.Days span', elem);
				if (daysCell.length > 0) {
					c.days = daysCell[0].children[0].data.trim();
				}
				
				var datetimeCell = $('td.DateTime div', elem);
				if (datetimeCell.length > 0) {
					c.time = datetimeCell[0].children[0].next.children[0].data || "";
					var dateParts = datetimeCell[1].children[0].data.split('\r\n');
					c.dates = dateParts[1].trim() + ' - ' + dateParts[3].trim();
				}
				
				var classNbrCell = $('td.ClassNbr div', elem);
				if (classNbrCell.length > 0) {
					c.id = classNbrCell[0].children[0].next.children[0].data.trim();
					c.units = classNbrCell[1].children[0].data.replace('Units', '').trim();
				}

				var statusCell = $('td.Status div', elem);
				if (statusCell.length > 0) {
					c.status = statusCell[0].children[0].data.trim();
					c.waitlist = statusCell[1].children[0].data.trim();
				}

				if (c.subject) {
					classes.push(c);	
				}
			}
		});
		
		return classes;
	};
	
}(module.exports));