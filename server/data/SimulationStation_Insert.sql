DELIMITER //
CREATE PROCEDURE `simulation_station_insert`(

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
    INSERT INTO simualationstation(
        StationID,
        OrganizationID,
        StationName,
        IPAddressLocal,
        IPAddressPublic,
        UE4_UniqueNetId,
        MachineName,
        isconnected,
        connectedtime,
        connectionduration,
        isActive,
        isRevokedAccess,
        LastConnectionDate,
        HeartBeatDateTime,
        InstructionToSession,
        InstructionFromSession
    ) 
    VALUES(
        in_organization_id,
        in_station_name,
        in_ip_address_local,
        in_ip_address_public,
        in_uae_unique_net_id,
        in_machine_name,
        in_is_connected,
        in_connected_time,
        in_connection_duration,
        in_is_active,
        in_is_revoked_access,
        in_last_connection_date,
        in_heart_beat_date_time,
        in_instruction_to_session,
        in_instruction_from_session
    );
END