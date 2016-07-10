from datetime import datetime, timedelta
from repository_base import Repository

class FakeRepository(Repository):
    def get_data(self,topic_name, numdays):

        today=datetime.today()

        # Create some test data
        # Three values from yesterday and three values from today
        data = ( 
            (20.1,today-timedelta(1.8)),
            (19.1,today-timedelta(1.4)),
            (22.1,today-timedelta(1.2)),
            (23.3,today-timedelta(0.9)),
            (19.1,today-timedelta(0.5)),
            (30.1,today-timedelta(0.1))
        )

        values = []
        labels = []

        for a,b in data:
            if (b > (today - timedelta(numdays))):
                values.append(a)
                labels.append(super(FakeRepository,self).date_formatted(b))

        return labels, values
