DELIMITER //
CREATE PROCEDURE `simulation_station_update`(
    IN in_station_id INT(11),
    IN in_organization_id INT(11),
    IN in_station_name VARCHAR(255),
    IN in_ip_address_local VARCHAR(50),
    IN in_ip_address_public VARCHAR(45),
    IN in_uae_unique_net_id VARCHAR(255),
    IN in_machine_name VARCHAR(50),
    IN in_is_connected INT(11),
    IN in_connected_time VARCHAR(45),
    IN in_connection_duration VARCHAR(45),
    IN in_is_active TINYINT(1),
    IN in_is_revoked_access TINYINT(1),
    IN in_last_connection_date DATETIME,
    IN in_heart_beat_date_time DATETIME,
    IN in_instruction_to_session VARCHAR(45),
    IN in_instruction_from_session VARCHAR(45)
)
BEGIN
    UPDATE simulationstation SET
        OrganizationID = in_organization_id,
        StationName = in_station_name,
        IPAddressLocal = in_ip_address_local,
        IPAddressPublic = in_ip_address_public,
        UE4_UniqueNetId = in_uae_unique_net_id,
        MachineName = in_machine_name,
        isconnected = in_is_connected,
        connectedtime = in_connected_time,
        connectionduration = in_connection_duration,
        isActive = in_is_active,
        isRevokedAccess = in_is_revoked_access,
        LastConnectionDate = in_last_connection_date,
        HeartBeatDateTime = in_heart_beat_date_time,
        InstructionToSession = in_instruction_to_session,
        InstructionFromSession = in_instruction_from_session
	WHERE
		StationID = in_station_id;
END