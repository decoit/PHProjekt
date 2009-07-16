<?php
/**
 * Unit test
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    $Id$
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 */
require_once 'PHPUnit/Framework.php';

/**
 * Tests for Default Search class
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Eduardo Polidor <polidor@mayflower.de>
 * @group      phprojekt
 * @group      search
 * @group      phprojekt-search
 */
class Phprojekt_SearchTest extends PHPUnit_Framework_TestCase
{
    /**
     * Test index
     */
    public function testIndex()
    {
        $project = new Project_Models_Project(array('db' => $this->sharedFixture));
        $project->title = 'CC�C DD�D TT�T';
        $project->path = '/1/';
        $project->ownerId = 1;
        $project->projectId = 1;
        $project->save();
        $project->saveRights(array(1 => 255, 2 => 255));
        Zend_Registry::set('searchInsertedId', $project->id);

        $search = new Phprojekt_Search();
        $result = $search->search('CC�C');
        $this->assertEquals(1, count($result));

        $result = $search->search('CC�C DD�D');
        $this->assertEquals(1, count($result));
    }

    /**
     * Test search
     */
    public function testSearch()
    {
        $search = new Phprojekt_Search();
        $result = (array)$search->search('CC�C DD�D');
        $this->assertEquals(1, count($result));

        $result = (array)$search->search('NOTINDATABASE');
        $this->assertEquals(0, count($result));
    }

    /**
     * Test search
     */
    public function testSearchShortString()
    {
        $search = new Phprojekt_Search();
        $result = (array)$search->search('CC');
        $this->assertEquals(0, count($result));

        $search = new Phprojekt_Search();
        $result = (array)$search->search('C�');
        $this->assertEquals(0, count($result));
    }

    /**
     * Test delete
     */
    public function testDelete()
    {
        $project = new Project_Models_Project();
        $project->find(Zend_Registry::get('searchInsertedId'));
        $project->delete();

        $search = new Phprojekt_Search();
        $result = (array)$search->search('CC�C DD�D');
        $this->assertEquals(0, count($result));
    }
}
