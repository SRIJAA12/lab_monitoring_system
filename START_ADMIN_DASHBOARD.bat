@echo off
title Lab Management System - Server

REM Get the IP address from .env or use default
set SERVER_IP=10.10.46.103
set SERVER_PORT=7401

cls
echo.
echo ================================================================
echo           LAB MANAGEMENT SYSTEM - STARTING...
echo ================================================================
echo.
echo  Status: Starting Node.js server...
echo  Location: central-admin\server
echo.
echo ================================================================
echo.

REM Change to server directory
cd /d "%~dp0central-admin\server"

REM Start node server (this will auto-open browser after 1 second)
node app.js
