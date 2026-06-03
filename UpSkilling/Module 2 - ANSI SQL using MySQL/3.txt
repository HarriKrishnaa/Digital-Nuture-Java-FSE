SELECT *
FROM Users u
WHERE u.user_id NOT IN (
    SELECT DISTINCT user_id
    FROM Registrations
    WHERE registration_date >= CURDATE() - INTERVAL 90 DAY
);