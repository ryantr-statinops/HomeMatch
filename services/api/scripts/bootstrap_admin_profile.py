import argparse
from uuid import UUID

from app.config.settings import get_settings
from app.integrations.supabase.client import create_supabase_client


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create or update an internal HomeMatch admin profile.",
    )
    parser.add_argument(
        "--user-id",
        required=True,
        type=UUID,
        help="Supabase Auth user UUID.",
    )
    parser.add_argument(
        "--display-name",
        required=True,
        help="Name shown in the Admin Portal.",
    )
    parser.add_argument(
        "--role",
        choices=("ADMIN", "SALE"),
        required=True,
        help="Internal authorization role.",
    )
    return parser.parse_args()


def main() -> None:
    arguments = parse_arguments()
    client = create_supabase_client(get_settings(), privileged=True)
    payload = {
        "user_id": str(arguments.user_id),
        "display_name": arguments.display_name.strip(),
        "role": arguments.role,
        "active": True,
    }

    if not payload["display_name"]:
        raise SystemExit("--display-name cannot be blank")

    client.table("admin_profile").upsert(
        payload,
        on_conflict="user_id",
    ).execute()
    print(
        f"Admin profile ready: {arguments.user_id} "
        f"({arguments.role}, {payload['display_name']})",
    )


if __name__ == "__main__":
    main()
