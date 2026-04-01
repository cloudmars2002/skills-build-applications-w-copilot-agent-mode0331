from datetime import date

from bson import ObjectId
from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, Leaderboard, Team, User, Workout


class Command(BaseCommand):
    help = "Populate the octofit_db database with test data"

    def handle(self, *args, **options):
        # Reset demo data using the Django ORM only.
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        Team.objects.create(
            _id=ObjectId(), name="team marvel", description="Marvel super heroes"
        )
        Team.objects.create(
            _id=ObjectId(), name="team dc", description="DC super heroes"
        )

        User.objects.create(
            _id=ObjectId(),
            name="Peter Parker",
            email="spiderman@marvel.com",
            team="team marvel",
        )
        User.objects.create(
            _id=ObjectId(),
            name="Tony Stark",
            email="ironman@marvel.com",
            team="team marvel",
        )
        User.objects.create(
            _id=ObjectId(),
            name="Bruce Wayne",
            email="batman@dc.com",
            team="team dc",
        )
        User.objects.create(
            _id=ObjectId(),
            name="Clark Kent",
            email="superman@dc.com",
            team="team dc",
        )

        Activity.objects.create(
            _id=ObjectId(),
            user="Peter Parker",
            activity_type="Cardio",
            duration=45,
            date=date(2026, 4, 1),
        )
        Activity.objects.create(
            _id=ObjectId(),
            user="Tony Stark",
            activity_type="Strength",
            duration=60,
            date=date(2026, 4, 1),
        )
        Activity.objects.create(
            _id=ObjectId(),
            user="Bruce Wayne",
            activity_type="HIIT",
            duration=40,
            date=date(2026, 4, 1),
        )
        Activity.objects.create(
            _id=ObjectId(),
            user="Clark Kent",
            activity_type="Running",
            duration=50,
            date=date(2026, 4, 1),
        )

        Leaderboard.objects.create(_id=ObjectId(), team="team marvel", points=220)
        Leaderboard.objects.create(_id=ObjectId(), team="team dc", points=200)

        Workout.objects.create(
            _id=ObjectId(),
            name="Spider Agility",
            description="Mobility and core",
            difficulty="medium",
        )
        Workout.objects.create(
            _id=ObjectId(),
            name="Arc Reactor Strength",
            description="Upper body strength",
            difficulty="hard",
        )
        Workout.objects.create(
            _id=ObjectId(),
            name="Gotham Endurance",
            description="Conditioning session",
            difficulty="medium",
        )
        Workout.objects.create(
            _id=ObjectId(),
            name="Krypton Power",
            description="Full-body power",
            difficulty="hard",
        )

        self.stdout.write(self.style.SUCCESS("status: success"))
        self.stdout.write(
            "Inserted test data for users, teams, activities, leaderboard, and workouts."
        )
