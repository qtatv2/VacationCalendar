<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260106191227 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vacation_request ADD employee_id INT NOT NULL');
        $this->addSql('ALTER TABLE vacation_request DROP employee');
        $this->addSql('ALTER TABLE vacation_request ADD CONSTRAINT FK_2A3500FC8C03F15C FOREIGN KEY (employee_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_2A3500FC8C03F15C ON vacation_request (employee_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE vacation_request DROP CONSTRAINT FK_2A3500FC8C03F15C');
        $this->addSql('DROP INDEX IDX_2A3500FC8C03F15C');
        $this->addSql('ALTER TABLE vacation_request ADD employee VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE vacation_request DROP employee_id');
    }
}
