import Content from '@codeday/topo/Molecule/Content';
import CognitoForm from '@codeday/topo/Molecule/CognitoForm';
import Page from '../components/Page';

export default function Volunteer({ upcoming }) {
  return (
    <Page slug="/volunteer" title="Volunteer">
      <Content>
        <CognitoForm formId={63} />
      </Content>
    </Page>
  )
}
