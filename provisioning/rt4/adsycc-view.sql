SELECT
	tickets.id,
	tickets.Type AS type,
	tickets.Resolution AS resolution,
	owner.Name AS ownerName,
	owner.RealName AS ownerRealName,
	owner.EmailAddress AS ownerEmail,
	tickets.Subject AS subject,
	tickets.Status AS status,
	tickets.Starts AS starts,
	tickets.Started AS started,
	tickets.Resolved AS resolved,
	tickets.LastUpdated AS lastUpdated,
	creator.Name AS creatorName,
	creator.RealName AS creatorRealName,
	creator.EmailAddress AS creatorEmail,
	tickets.Created AS created,
	groups.Type AS memberType,
	ticketmember.EmailAddress AS memberEmail
FROM
	tickets
JOIN groups ON
	"domain" = "RT::Ticket-Role"
	AND
	"instance" = tickets.id
	AND
	groups.Type IN ('Requestor', 'Cc', 'AdminCc')
JOIN groupmembers ON
	GroupId = groups.id
JOIN users as ticketmember ON
	groupmembers.MemberId = ticketmember.id
JOIN users as creator ON
  tickets.creator = creator.id
JOIN users as owner ON
  tickets.owner = owner.id
