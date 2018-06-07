DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `simulation_station_delete`(
    IN in_station_id INT(11)
)
BEGIN
	DELETE from simulationstation
	WHERE
		StationID = in_station_id;
END