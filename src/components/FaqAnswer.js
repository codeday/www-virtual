import React from 'react';
import Text, { Link } from '@codeday/topo/Atom/Text';

function mapRichText({
  nodeType, content, value, marks, data,
}) {
  const markMap = (marks || [])
    .reduce((accum, { type, ...rest }) => ({
      ...accum,
      [type]: Object.keys(rest).length > 0 ? rest : true,
    }), {});

  if (nodeType === 'text') {
    if (marks && marks.length > 0) {
      return (
        <Text as="span" fontWeight={markMap.bold && 'bold'} fontStyle={markMap.italic && 'italic'}>
          {value}
        </Text>
      );
    }
    return value;
  }

  const innerContent = content && content.map((c) => mapRichText(c));

  if (nodeType === 'hyperlink') {
    return <Link href={data.uri} target="_blank" rel="noopener">{innerContent}</Link>;
  }

  if (nodeType === 'paragraph') {
    return <Text>{innerContent}</Text>;
  }

  if (nodeType === 'document') {
    return <>{innerContent}</>;
  }

  return value;
}

export default function FaqAnswers({ json }) {
  return mapRichText(json);
}
