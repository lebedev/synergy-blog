import React, { useRef } from 'react';
import { v4 as uuid4 } from 'uuid';

import { EditPostForm } from '../../components/EditPostForm';

export function NewPost() {
  const id = useRef(uuid4());

  return (
    <EditPostForm post={{ id: id.current }} />
  );
}
