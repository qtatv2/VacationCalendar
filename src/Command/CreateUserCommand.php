<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-user',
    description: 'Creates a new user and saves it to the database.',
)]
class CreateUserCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('email', InputArgument::REQUIRED, 'The email address of the user.')
            ->addArgument('password', InputArgument::REQUIRED, 'The plain password for the user.')
            ->addArgument('is_admin', InputArgument::OPTIONAL, 'Set to 1 if user should be admin.', 0);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $email = $input->getArgument('email');
        $plainPassword = $input->getArgument('password');
        $isAdmin = (bool) $input->getArgument('is_admin');

        $user = new User();
        $user->setEmail($email);

        $roles = $isAdmin ? ['ROLE_ADMIN', 'ROLE_USER'] : ['ROLE_USER'];
        $user->setRoles($roles);

        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plainPassword
        );
        $user->setPassword($hashedPassword);


        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success(sprintf('Utworzono nowego użytkownika: %s (Admin: %s)', $email, $isAdmin ? 'Tak' : 'Nie'));

        return Command::SUCCESS;
    }
}
