# inline-sql-formatter 

[https://marketplace.visualstudio.com/items?itemName=vulkd.inline-sql-formatter](https://marketplace.visualstudio.com/items?itemName=vulkd.inline-sql-formatter)

## About & Usage
 - Created quickly to fill a need of formatting inline sql in javascript & python files.
 - Select any SQL. Open and choose 'SQL Inline Format' from the command palette.
 - Based off of [https://github.com/cymonbr/SqlFormatter-VSCode](https://github.com/cymonbr/SqlFormatter-VSCode)
 - Powered by [https://www.npmjs.com/package/sql-formatter](https://www.npmjs.com/package/sql-formatter).
 - Might add configuration options if I get the time. Feel free to submit a PR.
 - Example SQL taken from [https://sqlshack.com](https://sqlshack.com).

## Example Before and After:
```sql
-- the query returns a call summary for countries having average call duration > average call duration of all calls
SELECT 
    country.country_name_eng,
SUM(
    CASE WHEN call.id IS NOT NULL THEN 1 ELSE 0 END
    ) AS calls,
AVG(ISNULL(DATEDIFF(SECOND, call.start_time, call.end_time),0)) AS avg_difference FROM country 
-- we've used left join to include also countries without any call
LEFT JOIN city ON city.country_id = country.id
LEFT JOIN customer ON city.id = customer.city_id LEFT
    JOIN call ON call.customer_id = customer.id
GROUP BY 
    country.id, country.country_name_eng
-- filter out only countries having an average call duration > average call duration of all calls
HAVING AVG(
    ISNULL(DATEDIFF(SECOND, call.start_time, call.end_time),0)) > (SELECT AVG(DATEDIFF(SECOND, call.start_time, call.end_time)) FROM call)


ORDER BY calls DESC,
country.id ASC;
```

```sql
--the query returns a call summary for countries having average call duration > average call duration of all calls
SELECT
	country.country_name_eng,
	SUM(
		CASE
			WHEN CALL.id IS NOT NULL THEN 1
			ELSE 0
		END
	) AS calls,
	AVG(
		ISNULL(DATEDIFF(SECOND, CALL.start_time, CALL.end_time), 0)
	) AS avg_difference
FROM
	country --we've used left join to include also countries without any call
	LEFT JOIN city ON city.country_id = country.id
	LEFT JOIN customer ON city.id = customer.city_id
	LEFT JOIN CALL ON CALL.customer_id = customer.id
GROUP BY
	country.id,
	country.country_name_eng --filter out only countries having an average call duration > average call duration of all calls
HAVING
	AVG(
		ISNULL(DATEDIFF(SECOND, CALL.start_time, CALL.end_time), 0)
	) > (
		SELECT
			AVG(DATEDIFF(SECOND, CALL.start_time, CALL.end_time))
		FROM
			CALL
	)
ORDER BY
	calls DESC,
	country.id ASC;
```