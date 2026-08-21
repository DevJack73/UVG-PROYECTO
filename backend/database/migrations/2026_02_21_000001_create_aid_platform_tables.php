<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for the UVG Community Aid Platform.
     */
    public function up(): void
    {
        // 1. Communities Table
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('department')->default('Sololá');
            $table->string('municipality');
            $table->text('description')->nullable();
            $table->string('contact_person')->nullable();
            $table->enum('verified_status', ['verified', 'pending', 'inactive'])->default('verified');
            $table->unsignedInteger('families_count')->default(0);
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->timestamps();
        });

        // 2. Beneficiaries Table (Protected / Restricted Data)
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('community_id')->constrained()->cascadeOnDelete();
            $table->string('family_code')->unique(); // e.g. FAM-SOL-042 (Anonymized)
            $table->unsignedTinyInteger('family_members_count')->default(1);
            $table->text('vulnerability_notes')->nullable();
            $table->timestamps();
        });

        // 3. Campaign Categories Table
        Schema::create('campaign_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->string('color')->default('emerald');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 4. Collection Points Table (Campus Altiplano Locations)
        Schema::create('collection_points', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('campus')->default('Campus Altiplano (Sololá)');
            $table->string('building');
            $table->string('schedule');
            $table->string('responsible_contact');
            $table->string('phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('storage_capacity')->nullable();
            $table->timestamps();
        });

        // 5. Campaigns Table
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->foreignId('category_id')->constrained('campaign_categories');
            $table->foreignId('community_id')->constrained('communities');
            $table->foreignId('creator_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('organizer');
            $table->text('short_description');
            $table->longText('description');
            $table->string('hero_image');
            $table->decimal('monetary_goal', 12, 2)->nullable();
            $table->decimal('monetary_collected', 12, 2)->default(0);
            $table->unsignedInteger('item_goal_count')->default(100);
            $table->unsignedInteger('item_collected_count')->default(0);
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['draft', 'active', 'paused', 'completed', 'archived'])->default('active');
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        // 6. Campaign Needs Table
        Schema::create('campaign_needs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('unit')->default('unidades');
            $table->unsignedInteger('target_quantity');
            $table->unsignedInteger('current_quantity')->default(0);
            $table->enum('priority', ['high', 'medium', 'low'])->default('medium');
            $table->timestamps();
        });

        // 7. Donations Table (In-Kind & Monetary)
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donation_code')->unique(); // e.g. DON-2026-0089
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('donor_name');
            $table->string('donor_email');
            $table->string('donor_type')->default('Estudiante UVG');
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->enum('donation_type', ['in_kind', 'monetary']);
            $table->foreignId('collection_point_id')->nullable()->constrained('collection_points')->nullOnDelete();
            $table->enum('status', ['pledged', 'received', 'verified', 'assigned', 'delivered', 'pending', 'completed', 'failed', 'refunded'])->default('pledged');
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('currency', 3)->default('GTQ');
            $table->string('payment_method')->nullable();
            $table->string('transaction_reference')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('received_at')->nullable();
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('assigned_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });

        // 8. Donation Items Table
        Schema::create('donation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('campaign_need_id')->nullable()->constrained('campaign_needs')->nullOnDelete();
            $table->string('item_name');
            $table->unsignedInteger('quantity')->default(1);
            $table->string('unit')->default('unidades');
            $table->unsignedInteger('verified_quantity')->nullable();
            $table->text('condition_notes')->nullable();
            $table->timestamps();
        });

        // 9. Campaign Milestone Updates Table
        Schema::create('campaign_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->text('body');
            $table->enum('milestone_type', ['collection_started', 'goal_reached', 'items_verified', 'aid_delivered'])->default('items_verified');
            $table->json('media_urls')->nullable();
            $table->timestamps();
        });

        // 10. Audit Logs Table
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('user_email')->nullable();
            $table->string('action'); // e.g. STATUS_CHANGE, CAMPAIGN_CREATED
            $table->string('entity_type');
            $table->string('entity_id');
            $table->text('details')->nullable();
            $table->ipAddress('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('campaign_updates');
        Schema::dropIfExists('donation_items');
        Schema::dropIfExists('donations');
        Schema::dropIfExists('campaign_needs');
        Schema::dropIfExists('campaigns');
        Schema::dropIfExists('collection_points');
        Schema::dropIfExists('campaign_categories');
        Schema::dropIfExists('beneficiaries');
        Schema::dropIfExists('communities');
    }
};
