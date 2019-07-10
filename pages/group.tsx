import { withRouter } from 'next/router';
import Layout from '../components/common/Layout';

interface GroupProps {
  user: any;
}

const GroupContent = withRouter((props: any) => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the group content.</p>
  </div>
));

function Group(props: GroupProps) {
  return (
    <Layout user={props.user}>
      <GroupContent />
    </Layout>
  );
}

export default Group;
