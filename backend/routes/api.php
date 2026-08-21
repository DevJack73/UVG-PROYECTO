<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\ImpactController;
use App\Http\Controllers\Api\AdminController;

/*
|--------------------------------------------------------------------------
| API Routes — UVG Altiplano Community Aid & Donation Platform
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // --- 1. Authentication & Profiles ---
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
        
        // User personal donations and volunteer activity
        Route::get('/user/donations', [DonationController::class, 'userHistory']);
        Route::get('/user/volunteer-hours', [AuthController::class, 'volunteerHours']);
    });

    // --- 2. Public Campaigns & Catalog ---
    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::get('/campaigns/{slug}', [CampaignController::class, 'show']);
    Route::get('/campaign-categories', [CampaignController::class, 'categories']);
    Route::get('/collection-points', [CampaignController::class, 'collectionPoints']);

    // --- 3. Public Transparency & Impact ---
    Route::get('/impact/stats', [ImpactController::class, 'stats']);
    Route::get('/impact/communities', [ImpactController::class, 'communities']);
    Route::get('/impact/audit-logs', [ImpactController::class, 'publicAuditLogs']);

    // --- 4. Donation Pipeline ---
    Route::post('/donations/in-kind', [DonationController::class, 'storeInKind']);
    Route::post('/donations/monetary', [DonationController::class, 'storeMonetary']);
    Route::get('/donations/track/{code}', [DonationController::class, 'trackByCode']);

    // --- 5. Protected Operational & Admin Portal ---
    Route::middleware(['auth:sanctum', 'can:manage-platform'])->prefix('admin')->group(function () {
        Route::get('/kpis', [AdminController::class, 'kpis']);
        
        // Campaign CRUD
        Route::post('/campaigns', [CampaignController::class, 'store']);
        Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
        Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);
        Route::post('/campaigns/{id}/updates', [CampaignController::class, 'storeUpdate']);

        // Donation Status Verification Workflow
        Route::get('/donations', [AdminController::class, 'listDonations']);
        Route::put('/donations/{id}/status', [AdminController::class, 'updateDonationStatus']);

        // Communities & Logistics
        Route::post('/communities', [AdminController::class, 'storeCommunity']);
        Route::get('/audit-logs', [AdminController::class, 'auditLogs']);
    });

});
