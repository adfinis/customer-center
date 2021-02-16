import User from '../../app/routes/user/model';

describe('User model', () => {
  it('Returns the GitLab groups', async () => {
    let user = new User({
      usernmae: 'customer1',
      shortname: 'customer1',
      fisrtName: 'customer1',
      lastName: 'customer1',
      email: 'customer1@adfinis.com',
      groups: {
        content: [
          {
            dn: [
              'cn=adsy-customer',
              'ou=customers',
              'dc=adsy-ext',
              'dc=becs',
              'dc=adfinis-sygroup',
              'dc=ch',
            ].join(','),
            controls: [],
            cn: 'adsy-customer',
          },
          {
            dn: [
              'cn=customer1-git1-gitlab',
              'ou=customer1',
              'ou=customers',
              'dc=adsy-ext',
              'dc=becs',
              'dc=adfinis-sygroup',
              'dc=ch',
            ].join(','),
            controls: [],
            cn: 'customer1-git1-gitlab',
          },
          {
            dn: [
              'cn=customer1-git2-gitlab',
              'ou=customer1',
              'ou=customers',
              'dc=adsy-ext',
              'dc=becs',
              'dc=adfinis-sygroup',
              'dc=ch',
            ].join(','),
            controls: [],
            cn: 'customer1-git2-gitlab',
          },
        ],
      },
    });

    expect(user.getGitlabGroups()).to.have.same.members([
      'customer1-git1',
      'customer1-git2',
    ]);
  });
});
