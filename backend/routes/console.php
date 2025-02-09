<?php
use Illuminate\Support\Facades\Schedule;

/*
  @desc Clear expired password reset tokens every 15 minutes
*/

Schedule::command('auth:clear-resets')->everyFifteenMinutes();