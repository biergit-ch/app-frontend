import { withRouter, WithRouterProps } from 'next/router'
import Layout from '../components/Layout';

const GroupContent = withRouter((props: WithRouterProps) => (
  <div>
    <h1>{props.router.query.title}</h1>
    <p>This is the group content.</p>
  </div>
));

function Group() {
  return (
    <Layout>
      <GroupContent />
    </Layout>
  )
}

export default Group