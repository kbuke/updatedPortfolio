"""change technologies model attribute

Revision ID: 634be20ee32a
Revises: d8cf4393770e
Create Date: 2024-12-15 19:33:55.832390

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '634be20ee32a'
down_revision = 'd8cf4393770e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('languages', schema=None) as batch_op:
        batch_op.alter_column('experience',
               existing_type=sa.VARCHAR(),
               type_=sa.Integer(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('languages', schema=None) as batch_op:
        batch_op.alter_column('experience',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(),
               existing_nullable=False)

    # ### end Alembic commands ###