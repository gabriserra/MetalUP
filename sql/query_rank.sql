/*
Query to show rank:

SELECT U.username, S.points, S.rank, S.date
FROM user U INNER JOIN (SELECT T1.userId, T1.points, T1.date, COUNT(*) As rank
                        FROM score T1 CROSS JOIN score T2
                        WHERE T1.points <= T2.points
                        
                        --Add AND condition to count only highest score of player
                        AND T1.points = (SELECT MAX(points)
                   							FROM score T3
                   							WHERE T1.userId = T3.userId)
						AND T2.points = (SELECT MAX(points)
                 							FROM score T4
                 							WHERE T2.userId = T4.userId)
                        
                        
                        GROUP BY T1.userId, T1.points, T1.date) AS S 
            ON U.userId = S.userId
            
--Add WHERE condition to exclude other player rank            
WHERE U.userId = getUserId() --my user ID

ORDER BY S.rank ASC
LIMIT 0, 10 --per la pagina di classifica
*/