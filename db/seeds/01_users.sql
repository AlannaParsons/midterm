-- Users table seeds here (Example)
INSERT INTO schedules (user_cookie, url, type) VALUES ('1111111111111111', '862c6e6b', 'meeting');
INSERT INTO schedules (user_cookie, url, type) VALUES ('1111111111111111', 'd54c3371', 'dinner');
INSERT INTO schedules (user_cookie, url, type) VALUES ('1111111111111111', '84c2b66a', 'date');

INSERT INTO dates (schedule_id, utc) VALUES (1, 'Wed, 15 Nov 2023 07:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (1, 'Sun, 12 Nov 2023 07:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (1, 'Mon, 13 Nov 2023 07:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (2, 'Tue, 10 Oct 2023 06:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (2, 'Wed, 11 Oct 2023 06:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (2, 'Thu, 12 Oct 2023 06:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (3, 'Sat, 30 Dec 2023 07:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (3, 'Sat, 09 Dec 2023 07:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (3, 'Sat, 02 Dec 2023 07:00:00 GMT');
INSERT INTO dates (schedule_id, utc) VALUES (3, 'Sat, 23 Dec 2023 07:00:00 GMT');


-- duplicate info FIX
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (1, 'bob', '6740489741359201', 3);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (2, 'bob', '6740489741359201', 2);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (3, 'bob', '6740489741359201', 1);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (1, 'earl', '5540489741359201', 3);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (2, 'earl', '5540489741359201', 2);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (3, 'earl', '5540489741359201', 1);

INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (4, 'bob', '6740489741359201', 0);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (5, 'bob', '6740489741359201', 3);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (6, 'bob', '6740489741359201', 0);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (4, 'jan', '9940489741359201', 2);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (5, 'jan', '9940489741359201', 3);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (6, 'jan', '9940489741359201', 0);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (4, 'moe', '1940489741359201', 1);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (5, 'moe', '1940489741359201', 2);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (6, 'moe', '1940489741359201', 0);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (4, 'rex', '6140489741359201', 1);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (5, 'rex', '6140489741359201', 3);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (6, 'rex', '6140489741359201', 1);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (4, 'liz', '8440489741359201', 2);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (5, 'liz', '8440489741359201', 3);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (6, 'liz', '8440489741359201', 1);

INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (7, 'bob', '6740489741359201', 4);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (8, 'bob', '6740489741359201', 3);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (9, 'bob', '6740489741359201', 0);
INSERT INTO votes (date_id, voter_name, voter_cookie, rank) VALUES (10, 'bob', '6740489741359201', 0);

